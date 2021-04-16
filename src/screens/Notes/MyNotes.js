import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Button,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  createNote,
  deleteNote,
  getNotes,
  listNotes,
  reload
} from '../../services/action';
import AddModal from '../../components/AddModal';
import Footer from '../../components/Footer';
import { styles } from './styles';
class MyNotes extends React.Component {
  constructor(props) {
    super(props);
    this.props.getNotes(this.props.id);

    this.state = {
      addModal: false,
      note: {
        title: '',
        note: ''
      },
      itemModal: false
    };
  }
  setAddModalVisible = (visible) => {
    this.setState({ addModal: visible });
  };
  setItemModalVisible = (visible) => {
    this.setState({ itemModal: visible });
  };

  renderItem = ({ item }) => {
    let latest = false;
    if (item.title === this.props.latestTitle) {
      latest = true;
    }
    let data = this.props.data.filter((obj) => obj.title === item.title);
    return (
      <TouchableOpacity
        onPress={() => {
          this.setItemModalVisible(true);
          this.props.setListData(data);
        }}
        style={[
          styles.items,
          this.props.darkMode ? styles.darkItems : null,
          latest ? styles.latestItem : null
        ]}>
        <Text
          style={[
            styles.title,
            this.props.darkMode ? styles.footerDarkTxt : null,
            latest ? styles.red : null
          ]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.title,
            this.props.darkMode ? styles.fontDarkText : null,
            latest ? styles.red : null
          ]}>
          {data.length}
        </Text>
      </TouchableOpacity>
    );
  };
  renderNoteList = ({ item, index }) => {
    let latest = false;
    if (index === 0) {
      latest = true;
    }
    return (
      <View
        style={[
          styles.items,
          this.props.darkMode ? styles.darkItems : null,
          latest ? styles.latestItem : null
        ]}>
        <Text
          style={[
            styles.title,
            this.props.darkMode ? styles.footerDarkTxt : null,
            latest ? styles.red : null
          ]}>
          {item.data}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.deleteNote(this.props.id, item.id);
          }}>
          <Image
            style={styles.img}
            source={require('../../assets/delete.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { darkMode, navigation, id, isLoading, noteTitle } = this.props;
    const { note } = this.state;
    return (
      <SafeAreaView
        style={[styles.container, darkMode ? styles.darkContainer : null]}>
        <View>
          <Text
            style={[
              styles.footerTxt,
              styles.heading,
              darkMode ? styles.footerDarkTxt : null
            ]}>
            My Notes
          </Text>
        </View>

        <View>
          <FlatList
            data={noteTitle}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.props.isLoading}
                onRefresh={() => {
                  this.props.getNotes(id);
                }}
              />
            }
          />
        </View>

        <Footer
          setAddModalVisible={() => this.setAddModalVisible(true)}
          darkMode={darkMode}
          openDrawer={() => navigation.openDrawer()}
        />
        <Modal
          animationType="slide"
          visible={this.state.addModal}
          onRequestClose={() => this.setAddModalVisible(false)}
          transparent={false}>
          <AddModal
            close={() => this.setAddModalVisible(false)}
            darkMode={darkMode}
            onChangeTitle={(title) =>
              this.setState({ note: { ...note, title } })
            }
            onChangeNote={(text) =>
              this.setState({ note: { ...note, note: text } })
            }
            onSubmit={() => {
              this.props.createNote(id, note);

              this.props.getNotes(id);
              setTimeout(() => {
                this.setState({ note: { title: '', note: '' } });
              }, 1);
            }}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={this.state.itemModal}
          onRequestClose={() => this.setEditModalVisible(false)}
          transparent={false}>
          {this.state.itemModal ? (
            <SafeAreaView
              style={[
                styles.container,
                darkMode ? styles.darkContainer : null
              ]}>
              <TouchableOpacity
                style={styles.goBackContainer}
                onPress={() => {
                  this.props.getNotes(id);
                  this.setItemModalVisible(false);
                }}>
                <Text
                  style={[
                    styles.goBacktxt,
                    this.props.darkMode ? styles.darkColor : null
                  ]}>
                  {'<'}My Notes
                </Text>
              </TouchableOpacity>

              <View style={[styles.addView]}>
                <Text
                  style={[
                    styles.footerTxt,
                    styles.heading,
                    darkMode ? styles.footerDarkTxt : null
                  ]}>
                  {this.props.listData[0].title}
                </Text>
              </View>
              <View style={styles.list}>
                <FlatList
                  data={this.props.listData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderNoteList}
                />
              </View>
            </SafeAreaView>
          ) : null}
        </Modal>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: (id) => dispatch(getNotes(id)),
    setListData: (data) => dispatch(listNotes(data)),
    createNote: (id, note) => dispatch(createNote(id, note)),
    deleteNote: (id, noteId) => dispatch(deleteNote(id, noteId))
  };
};
const mapStateToProps = (state) => {
  return {
    id: state.id.id,
    data: state.notes.data,
    noteTitle: state.notes.noteTitle,
    latestTitle: state.notes.latestTitle,
    isLoading: state.notes.isLoading,
    darkMode: state.id.darkMode,
    listData: state.list.data
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyNotes);
